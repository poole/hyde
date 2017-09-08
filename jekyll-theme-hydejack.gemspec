# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-hydejack"
  spec.version       = "6.6.1"
  spec.authors       = ["Florian Klampfer"]
  spec.email         = ["mail@qwtel.com"]

  spec.summary       = %q{A pretentious two-column Jekyll theme, stolen by @qwtel from Hyde. You could say it was.. hydejacked.}
  spec.homepage      = "https://qwtel.com/hydejack/"
  spec.license       = "GPL-3.0"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.5"

  spec.add_runtime_dependency "jekyll-default-layout", "~> 0.1"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.9"
  spec.add_runtime_dependency "jekyll-gist", "~> 1.4.1"
  spec.add_runtime_dependency "jekyll-optional-front-matter", "~> 0.2"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-redirect-from", "~> 0.12"
  spec.add_runtime_dependency "jekyll-relative-links", "~> 0.4"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.2"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.0"

  spec.add_runtime_dependency "classifier-reborn", "~> 2.1"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
