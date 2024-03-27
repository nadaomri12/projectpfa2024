import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleFiltrerPipe'
})
export class ArticleFiltrerPipePipe implements PipeTransform {

  transform(articles: any[], filterText: string): any[] {
    if (!articles || articles.length === 0 || !filterText?.trim()) {
      return articles;
    }

    return articles.filter(article => 
      article.nomProduit.toLowerCase().includes(filterText.toLowerCase())
    );
  }



}
