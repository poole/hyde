# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-hydejack"
  spec.version       = "8.5.2"
  spec.authors       = ["Florian Klampfer"]
  spec.email         = ["mail@qwtel.com"]

  spec.summary       = %q{"Best Jekyll Theme by a Mile"}
  spec.homepage      = "https://hydejack.com/"
  spec.license       = "GPL-3.0"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.required_ruby_version = "~> 2.2"

  spec.add_runtime_dependency "jekyll", "~> 3.7"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
