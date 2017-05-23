# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-hydejack"
  spec.version       = "6.1.1"
  spec.authors       = ["Florian Klampfer"]
  spec.email         = ["f.klampfer@gmail.com"]

  spec.summary       = %q{A pretentious two-column Jekyll theme, stolen by @qwtel from Hyde. You could say it was.. hydejacked.}
  spec.homepage      = "https://qwtel.com/hydejack/"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.4"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
