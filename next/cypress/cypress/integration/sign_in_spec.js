describe("Sign in", () => {
  it("successfully sign in", function () {
    cy.visit("/auth/sign-in")
    cy.focus("input[name='name']").type("hoge@example.com")
  })
})
