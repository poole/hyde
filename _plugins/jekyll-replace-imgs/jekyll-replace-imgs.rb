IMG_REGEX = /\<img\s+(.*?)\s+\/\>/m

REPLACE_STR = '<hy-img><noscript><img \1 /></noscript></hy-img>'

Jekyll::Hooks.register([:pages, :posts, :documents], :post_render) do |post|
  post.output = post.output.gsub(IMG_REGEX, REPLACE_STR)
end
