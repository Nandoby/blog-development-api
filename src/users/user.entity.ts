import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '../articles/article.entity';
import { Comment } from '../comments/comment.entity';

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
  password: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  role: string[]

  @OneToMany(() => Article, (article: Article) => article.user)
  articles: Article[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  comments: Comment[];
  
  @BeforeInsert()
  defaultUser() {
    this.role = ['user']
  }

}
