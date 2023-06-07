import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Vérifier si l'user est défini
    if (!user) {
      return false;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler()) || this.reflector.get<string[]>('roles', context.getClass());

    if (!roles) {
      return true;
    }

    const hasRole = () => user.roles.some((role: string) => roles.includes(role.trim()));
    return user && hasRole();
  }
}
