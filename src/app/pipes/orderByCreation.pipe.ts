import { Pipe, PipeTransform } from '@angular/core';
import { Movement } from '../models/movement.model';

@Pipe({
  name: 'orderByCreation',
})
export class orderByCreation implements PipeTransform {
  transform(movements: Movement[]): Movement[] {
    return movements.length > 0
      ? [...movements].sort((a, b) => {
          if (a?.type === 'income') {
            return -1;
          } else {
            return 1;
          }
        })
      : movements;
  }
}
