IMG_REGEX = /<img(.*?)\/>/m

REPLACE_STR = '<shy-img><noscript><img\1/></noscript></shy-img>'

Jekyll::Hooks.register([:pages, :posts, :documents], :post_render) do |post|
  post.output = post.output.gsub(IMG_REGEX, REPLACE_STR)
end
