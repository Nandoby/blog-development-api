import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '../articles/article.entity';
import { Comment } from '../comments/comment.entity';
import { Role } from '../roles/role.entity';

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

  @OneToMany(() => Article, (article: Article) => article.user)
  articles: Article[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Role, (role: Role) => role.users)
  roles: Role[];
}
