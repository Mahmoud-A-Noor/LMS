import { Injectable } from '@nestjs/common';
import { UserCourseAccess } from './entities/userCourseAccess.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';


@Injectable()
export class UserCourseAccessService {
  constructor(
    @InjectRepository(UserCourseAccess)
    private readonly userCourseAccessRepository: EntityRepository<UserCourseAccess>,
  ) {}


}
