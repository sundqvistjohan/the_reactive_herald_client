describe("Visitor can see side articles", () => {
  beforeEach(() => {
    cy.server();
  });
  
  it("successfully", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:side_articles_shown.json"
    });
    cy.visit("/");
    cy.get("#side-articles-div-2").should("contain", "TestBody2");
  });

  it("unsuccessfully", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:side_articles_empty.json"
    });
    cy.visit("/");
    cy.get("#message2").should("contain", "No articles found");
  });
});
