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
    },
    {
      markdown: 'angular',
      html: 'angular 6'
    }
  ];

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
        if (this.text.indexOf(symbol.markdown) > -1) {
          let splittedParagraph = this.text.split(symbol.markdown);

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
      (symbol) => this.text = this.text.replace(symbol.markdown, symbol.html)
    );
  }
}