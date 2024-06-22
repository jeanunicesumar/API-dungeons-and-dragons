import { Module } from '@nestjs/common';
import CharacterValidate from './character.validate';
import CommonRequest from '../common-request/common-request';

@Module({
  imports: [],
  providers: [CharacterValidate, CommonRequest],
  exports: [CharacterValidate]
})
export class CharacterValidateModule {}
