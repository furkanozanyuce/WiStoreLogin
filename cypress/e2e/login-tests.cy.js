describe('Sayfa Açılıyor mu?', () => {
    
    it("First page", () => {
        cy.visit('http://localhost:5173/');
    })
});

describe('Input Hataları', () => {
    
    it('Başarılı giriş yapınca main sayfasına gidiyor', () => {
        cy.visit('http://localhost:5173/');

        cy.get('[data-cy="email"]').type('erdem.guntay@wit.com.tr');
        cy.get('[data-cy="password"]').type('9fxIH0GXesEwH_I');
        cy.get('[data-cy="terms"]').check();

        cy.get('[data-cy="button"]').should('not.be.disabled').click();
        cy.url().should('include', '/main');
      });
    
      it('Hatalı email girince hata mesajı çıkıyor, kontrol edip butonu disabled yapıyor', () => {
        cy.visit('http://localhost:5173/');

        cy.get('[data-cy="email"]').type('zsdsdsdfsd');

        cy.get('[data-cy="email-error"]').should('have.length', 1);

        cy.contains('Please enter a valid email address').should('be.visible');

        cy.get('[data-cy="button"]').should('be.disabled');
      });
    
      it('Hatalı email ve şifre girince 2 hata mesajı çıkıyor, kontrol edip butonu disabled yapıyor', () => {
        cy.visit('http://localhost:5173/');

        cy.get('[data-cy="email"]').type('sdfsdfgf');
        cy.get('[data-cy="password"]').type('12');

        cy.get('[data-cy="email-error"]').should('have.length', 1);
        cy.get('[data-cy="password-error"]').should('have.length', 1);

        cy.contains('Please enter a valid email address').should('be.visible');
        cy.contains('Password must be at least 4 characters long').should('be.visible');

        cy.get('[data-cy="button"]').should('be.disabled');
      });
    
      it('Email ve password doğru fakat kurallar kabul edilmediğinde buton disabled kalıyor', () => {
        cy.visit('http://localhost:5173/');

        cy.get('[data-cy="email"]').type('erdem.guntay@wit.com.tr');
        cy.get('[data-cy="password"]').type('9fxIH0GXesEwH_I');
        
        cy.get('[data-cy="button"]').should('be.disabled');
      });

      it('Email ve password yanlış girip ve terms onaylanınca error sayfasına gidiyor', () => {
        cy.visit('http://localhost:5173/');

        cy.get('[data-cy="email"]').type('dsfdsf@sdfs.com');
        cy.get('[data-cy="password"]').type('1234');
        cy.get('[data-cy="terms"]').check();
        
        cy.get('[data-cy="button"]').should('not.be.disabled').click();
        cy.url().should('include', '/error');
      });

      it('Terms ilk önce check yapıp sonra checki kaldırınca buton disabled oluyor', () => {
        cy.visit('http://localhost:5173/');

        cy.get('[data-cy="email"]').type('dsfdsf@sdfs.com');
        cy.get('[data-cy="password"]').type('1234');
        cy.get('[data-cy="terms"]').check();
        cy.get('[data-cy="terms"]').uncheck();


        
        cy.get('[data-cy="button"]').should('be.disabled');
      });
});
