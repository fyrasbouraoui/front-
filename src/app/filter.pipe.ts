import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value; // Return the original value if either value or searchText is not provided
    }
    const searchTerm = searchText.toLowerCase(); // Convert search text to lowercase for case-insensitive search
    return value.filter(item => {
      // Check if any property of the item contains the search term
      return Object.values(item).some(value => {
        // Convert the value to lowercase and check if it includes the search term
        return value && value.toString().toLowerCase().includes(searchTerm);
      });
    });
  }
}
