workflow "Tests" {
  resolves = ["Eslint", "Jest"]
  on = "push"
}

action "Dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Eslint" {
  uses = "gimenete/eslint-action@1.0"
  args = ""
  secrets = ["GITHUB_TOKEN"]
  needs = ["Dependencies"]
}

action "Jest" {
  uses = "actions/npm@master"
  args = "run test:ci"
  needs = ["Dependencies"]
}
