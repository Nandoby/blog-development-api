import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({ default: 'default-cover.png' })
  coverImage: string;

  @ManyToOne(() => User, (user) => user.articles, {
    onDelete: 'CASCADE'
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ManyToMany(() => Category, (category: Category) => category.articles)
  @JoinTable({
    name: 'article_category',
  })
  categories: Category[];
}
