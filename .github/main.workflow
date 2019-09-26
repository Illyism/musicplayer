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
}

action "Jest" {
  uses = "docker://rkusa/jest-action:latest"
  args = "--ci --collectCoverageFrom='src/**/*{js,vue}'"
  needs = ["Dependencies"]
  secrets = ["GITHUB_TOKEN"]
  env = {
    JEST_CMD = "vue-cli-service test:unit"
  }
}
