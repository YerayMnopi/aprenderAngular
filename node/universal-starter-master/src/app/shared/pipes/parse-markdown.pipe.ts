import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name:"parseMarkdown"
})
export class ParseMarkdownPipe implements PipeTransform {

  symbols = [
    {
      markdown: '_',
      html: 'em'
    },
    {
      markdown: '**',
      html: 'strong'
    }
  ];

  codes = [    
    {
      markdown: '~>',
      html: '&nbsp;&nbsp;'
    }
  ]

  transform(paragraph: string): SafeHtml {

    this.symbols.forEach(
      (symbol) => {
        let splittedParagraph = paragraph.split(symbol.markdown);

        if (splittedParagraph.length > 1) {
          paragraph = splittedParagraph.reduce(
            (previousText: string, currentText: string, currentIndex: number) => {
              let tag = '<';
  
              if (currentIndex % 2 !== 0) {
                tag += '/'; 
              }
  
              return previousText + currentText + tag + symbol.html + '>';
            }, ''
          );
        }
      }
    );

    this.codes.forEach(
      (symbol) => {
        let splittedParagraph = paragraph.split(symbol.markdown);

        if (splittedParagraph.length > 1) {
          paragraph = splittedParagraph.reduce(
            (previousText: string, currentText: string, currentIndex: number) => {  
              return previousText + currentText + symbol.html;
            }, ''
          );
        }
      }
    );

    return paragraph;
  }
}