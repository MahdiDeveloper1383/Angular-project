import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], filterText: string, property: string): any[] {
    if (!items || !filterText) {
      return items; // Return all items if no filter is applied
    }
    return items.filter((item) =>
      item[property]?.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
