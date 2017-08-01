import { Pipe, PipeTransform } from '@angular/core';
/*
 * Calculates base 64 of a string
 * Usage:
 *   value | btoa
 * Example:
 *   {{ 'some string' | btoa }}
 *   formats to: c29tZSBzdHJpbmc==
*/
@Pipe({name: 'btoa'})
export class Btoa implements PipeTransform {
  transform(value: string): string {
    return btoa(value);
  }
}