# Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

# # Jekyll Replace `img`s
# This is a tiny, optional plugin (will be ignored on GitHub Pages)
# that replaces <img> tags with placeholders that won't load immediately.
# This can increase page load speed, especially for documents with lots of images.
#
# This requires a JS component to lazy-load the images.
# See also: https://github.com/qwtel/hy-img

KEY_CONFIG = 'replace_imgs'

KEY_RE_IMG      = 're_img'
KEY_RE_IGNORE   = 're_ignore'
KEY_REPLACEMENT = 'replacement'

RE_IMG      = '<img\s*(?<attrs>.*?)\s*/>'
RE_IGNORE   = 'data-ignore'
REPLACEMENT = '<hy-img %{attrs}><noscript><img data-ignore %{attrs}/></noscript></hy-img>'

RE_DATAURL = /src\s*=\s*["']\s*data:/ix

if ENV['JEKYLL_ENV'] == 'production' then
  REPLACEMENT.gsub!(/\n+/, '')
end

config, re_img, re_ignore, replacement = nil

def get_config(config, key)
  return config[KEY_CONFIG] && config[KEY_CONFIG][key]
end

Jekyll::Hooks.register(:site, :after_init) do |site|
  re_img = Regexp.new(
    get_config(site.config, KEY_RE_IMG) ||  RE_IMG, 
    Regexp::EXTENDED | Regexp::IGNORECASE | Regexp::MULTILINE
  )

  re_ignore = Regexp.new(
    get_config(site.config, KEY_RE_IGNORE) ||  RE_IGNORE,
    Regexp::EXTENDED | Regexp::IGNORECASE
  )

  replacement = get_config(site.config, KEY_REPLACEMENT) || REPLACEMENT
  if ENV['JEKYLL_ENV'] == 'production' then 
    replacement.gsub!(/\n+/, '') 
  end
end

Jekyll::Hooks.register([:pages, :documents], :post_render) do |page|
  i = 0
  page.output = page.output.gsub(re_img) do |match|
    last_match = Regexp.last_match

    subs = { i:i }
    for name in last_match.names
      subs[name.intern] = last_match[name]
    end

    if match.index(re_ignore).nil? && match.index(RE_DATAURL).nil? then
      i += 1
      replacement % subs
    else
      match
    end
  end
end
