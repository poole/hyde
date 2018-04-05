RE_IMG     = /<img(.*?)\/>/m
RE_DATAURL = /.*src\s*=\s*["']\s*data:.*["']/

REPLACEMENT = '<noscript data-i="%{i}"><img%{attrs}/></noscript>'

CONFIG_KEY = 'replace_imgs'
REPLACEMENT_KEY = 'replacement'

Jekyll::Hooks.register([:pages, :documents], :post_render) do |page|
  config ||= page.site.config
  replacement ||= (config[CONFIG_KEY] && config[CONFIG_KEY][REPLACEMENT_KEY]) ||
    REPLACEMENT

  i = 0
  page.output = page.output.gsub(RE_IMG) do |orig|
    attrs = Regexp.last_match[1]

    if orig.index(RE_DATAURL).nil? then
      i += 1
      replacement % { i:i, attrs:attrs }
    else
      orig
    end
  end
end
