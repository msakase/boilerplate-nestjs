import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Factory.define('User')
  .sequence('id')
  .attr('name', faker.name.firstName())
  .attr('passwordHash', faker.internet.password())
  .attr('createdAt', faker.datatype.datetime())
  .attr('updatedAt', faker.datatype.datetime());
