import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '../articles/article.entity';
import { Comment } from '../comments/comment.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ default: 'default.png' })
  picture: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  roles: string[];

  @OneToMany(() => Article, (article: Article) => article.user)
  articles: Article[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  comments: Comment[];

  @BeforeInsert()
  defaultUser() {
    this.roles = ['user'];
  }
}
