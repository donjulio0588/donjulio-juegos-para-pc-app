import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstWords',
  standalone: true,
})
export class FirstWordsPipe implements PipeTransform {
  transform(value: string, wordCount: number = 200): string {
    if (!value) return '';

    // Split the text into words and remove empty strings
    const words = value.split(' ').filter((word) => word.length > 0);

    // If text has fewer words than limit, return original text
    if (words.length <= wordCount) {
      return value;
    }

    // Get first n words and join them back together
    const truncatedText = words.slice(0, wordCount).join(' ');

    // Add ellipsis to indicate there's more text
    return `${truncatedText}...`;
  }
}
