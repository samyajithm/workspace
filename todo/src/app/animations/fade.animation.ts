//explanation -> https://medium.com/@tanya/angular4-animated-route-transitions-b5b9667cd67c
import { trigger, animate, transition, style, query } from '@angular/animations';

export const fadeAnimation =
  
  trigger('fadeAnimation', [
    
    transition( '* => *', [
      
      query(':enter',
        [
          style({ opacity: 0 })
        ],
        { optional: true }
      ),
      
      query(':leave',
        [
          style({ opacity: 1 }),
          animate('0.5s', style({ opacity: 0 }))
        ],
        { optional: true }
      ),
      
      query(':enter',
        [
          style({ opacity: 0 }),
          animate('0.5s', style({ opacity: 1 }))
        ],
        { optional: true }
      )
      
    ])
    
  ]);
