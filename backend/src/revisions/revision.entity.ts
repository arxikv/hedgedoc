/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import {
  convertRawFrontmatterToNoteFrontmatter,
  extractFirstHeading,
  extractFrontmatter,
  generateNoteTitle,
  NoteFrontmatter,
  parseRawFrontmatterFromYaml,
} from '@hedgedoc/commons';
import { defaultNoteFrontmatter } from '@hedgedoc/commons';
import { parseDocument } from 'htmlparser2';
import MarkdownIt from 'markdown-it';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Note } from '../notes/note.entity';
import { Tag } from '../notes/tag.entity';
import { Edit } from './edit.entity';

/**
 * The state of a note at a particular point in time,
 * with the content at that time and the diff to the previous revision.
 *
 */
@Entity()
export class Revision {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The patch from the previous revision to this one.
   */
  @Column({
    type: 'text',
  })
  patch: string;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @ManyToMany((_) => Tag, (tag) => tag.revisions, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  tags: Promise<Tag[]>;

  /**
   * The note content at this revision.
   */
  @Column({
    type: 'text',
  })
  content: string;

  /**
   * The length of the note content.
   */
  @Column()
  length: number;

  @Column('simple-array', { nullable: true })
  yjsStateVector: null | number[];

  /**
   * Date at which the revision was created.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Note this revision belongs to.
   */
  @ManyToOne((_) => Note, (note) => note.revisions, { onDelete: 'CASCADE' })
  note: Promise<Note>;

  /**
   * All edit objects which are used in the revision.
   */
  @ManyToMany((_) => Edit, (edit) => edit.revisions)
  @JoinTable()
  edits: Promise<Edit[]>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static create(
    content: string,
    patch: string,
    note: Note,
    yjsStateVector?: number[],
  ): Omit<Revision, 'id' | 'createdAt'> {
    const frontmatter = this.parseFrontmatter(content);
    const title = generateNoteTitle(frontmatter, () =>
      this.extractFirstHeadingFromContent(content),
    );
    const description = frontmatter?.description ?? '';
    const tags = Revision.createTagEntities(frontmatter);

    const newRevision = new Revision();
    newRevision.patch = patch;
    newRevision.content = content;
    newRevision.length = content.length;
    newRevision.title = title;
    newRevision.description = description;
    newRevision.tags = Promise.resolve(tags);
    newRevision.note = Promise.resolve(note);
    newRevision.edits = Promise.resolve([]);
    newRevision.yjsStateVector = yjsStateVector ?? null;
    return newRevision;
  }

  private static createTagEntities(frontmatter?: NoteFrontmatter): Tag[] {
    if (frontmatter === undefined) {
      return [];
    }
    return frontmatter.tags.map((tagName) => {
      const entity = new Tag();
      entity.name = tagName;
      return entity;
    });
  }

  private static parseFrontmatter(
    content: string,
  ): NoteFrontmatter | undefined {
    const rawText = extractFrontmatter(content.split('\n'))?.rawText;

    if (!rawText) {
      return undefined;
    }

    const rawDataValidation = parseRawFrontmatterFromYaml(rawText);
    if (rawDataValidation.error !== undefined) {
      return defaultNoteFrontmatter;
    }

    return convertRawFrontmatterToNoteFrontmatter(rawDataValidation.value);
  }

  private static extractFirstHeadingFromContent(
    content: string,
  ): string | undefined {
    const markdownIt = new MarkdownIt('default');
    const html = markdownIt.render(content);
    const document = parseDocument(html);
    return extractFirstHeading(document);
  }
}
