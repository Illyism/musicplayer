workflow "Tests" {
  on = "push"
  resolves = ["Jest"]
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
