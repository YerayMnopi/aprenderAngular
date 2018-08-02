import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name:"parseMarkdown"
})
export class ParseMarkdownPipe implements PipeTransform {

  text: string;

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

  transform(text: string): SafeHtml {

    if (!text) {
      return '';
    }

    this.text = text;

    this.parseSymbols();
    this.parseCodes();

    return this.text;
  }

  private parseSymbols() {
    this.symbols.forEach(
      (symbol) => {
        let splittedParagraph = this.text.split(symbol.markdown);

        if (splittedParagraph.length > 1) {
          this.text = splittedParagraph.reduce(
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
  }

  private parseCodes() {
    this.codes.forEach(
      (symbol) => {
        let splittedParagraph = this.text.split(symbol.markdown);

        if (splittedParagraph.length > 1) {
          this.text = splittedParagraph.reduce(
            (previousText: string, currentText: string, currentIndex: number) => {  
              return previousText + currentText + symbol.html;
            }, ''
          );
        }
      }
    );
  }
}