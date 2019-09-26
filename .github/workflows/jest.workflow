workflow "Tests" {
  resolves = ["Jest"]
  on = "push"
}

action "Dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Jest" {
  uses = "docker://rkusa/jest-action:latest"
  args = "--ci --collectCoverageFrom='src/**/*{js,vue}'"
  needs = ["Dependencies"]
  secrets = ["GITHUB_TOKEN"]
}
