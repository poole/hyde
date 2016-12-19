# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-hyde"
  spec.version       = "2.0.0"
  spec.authors       = ["Mark Otto"]
  spec.email         = ["markdotto@gmail.com"]

  spec.summary       = "Hyde is a brazen two-column Jekyll theme that pairs a prominent sidebar with uncomplicated content."
  spec.homepage      = "https://github.com/poole/hyde"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", "~> 3.3"

  spec.add_development_dependency "bundler", "~> 1.13"
  spec.add_development_dependency "rake", "~> 12.0"
end
