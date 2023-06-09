import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class ArticlesOwnerGuard implements CanActivate {
    constructor(private readonly articleService: ArticlesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    const articleId = request.params.id;

    const article = await this.articleService.findOne(articleId)


    if (article && article.user.id === user.sub) {
        return true
    }

    throw new UnauthorizedException("Vous n'êtes pas autorisé à accéder à cet article");
  }
}
