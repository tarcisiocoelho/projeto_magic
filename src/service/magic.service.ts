import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, filter, from, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagicService {
  constructor(private http: HttpClient) { }
  api: string = 'https://api.magicthegathering.io/v1';

  setCards(name: string): Observable<any>{
    return this.http.get(`${this.api}/sets?name=${name} |origins`);
  }

  setBoosters(id: string): Observable<any>{
    return this.http.get(`${this.api}/sets/${id}/booster`);
  }


  getCreatureCards(collectionId: string): Observable<any[]> {
    let creatureCards: any[] = [];
    let totalCreatureCards = 0;

    return new Observable<any[]>(observer => {
      this.fetchCreatureCards(collectionId, creatureCards, totalCreatureCards, observer);
    });
  }

  private fetchCreatureCards(collectionId: string, creatureCards: any[], totalCreatureCards: number, observer: any) {
    if (totalCreatureCards >= 30) {
      observer.next(creatureCards.slice(0, 30));
      observer.complete();
      return;
    }

    this.setBoosters(collectionId).subscribe(
      (response: any) => {
        const cards = response.cards.filter((card: any) => card.types.includes('Creature'));
        creatureCards.push(...cards);
        totalCreatureCards = creatureCards.length;
        this.fetchCreatureCards(collectionId, creatureCards, totalCreatureCards, observer);
      },
      error => {
        observer.error(error);
      }
    );
  }
}
