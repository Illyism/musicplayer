workflow "Tests" {
  resolves = ["Eslint", "Codecov"]
  on = "push"
}

action "Dependencies" {
  uses = "actions/npm@master"
  args = "ci"
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

action "Codecov" {
  uses = "codecov/codecov-action@v1.0.2"
  needs = ["Jest"]
  secrets = ["CODECOV_TOKEN"]
}