describe("Sign in", () => {
  it("successfully sign in", function () {
    cy.visit("/auth/sign-in")
    cy.get("input[name='name']").focus().type("hoge")
    cy.get("input[name='email']").focus().type("hoge@example.com")
    cy.get("input[name='password']").focus().type("password1")
    cy.get("input[name='password_confirmation']").focus().type("password1")
    cy.get("button[type='submit'").click()

    cy.url().should("eq", "http://next.dev:3000/")
  })
})
