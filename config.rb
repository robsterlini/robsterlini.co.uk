###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

### t
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Requires
require 'builder'
require 'yaml'

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
String.class_eval do
  def to_slug
    value = self.mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n, '').to_s
    value.gsub!(/[']+/, '')
    value.gsub!(/\W+/, ' ')
    value.strip!
    value.downcase!
    value.gsub!(' ', '-')
    value
  end
end

#Create full image markup helper
helpers do
  def blog_image(image, caption, alt, position)
    "<div class='figure-wrap#{position == "half" ? " figure-wrap--half" : ""}'>
      <figure class='image--#{position} ss-picture image--to-load'>
        <img class='img--script' src='/assets/images/helpers/image-placeholder.png'
          data-src='#{image}'
          data-js='lazy-load-image'
          alt='#{alt}'
          title='#{caption}'>
          <noscript>
            <img class='img--noscript' src='#{image}' alt='#{alt}' title='#{caption}'>
          </noscript>
        <figcaption class='ss-picture'>#{caption}</figcaption>
      </figure>
    </div>"
  end
  def middleplate_markdown(md)
      opening_tag = "<div class='mp-stack--left'>"
      middle_tag  = "</div><div class='mp-stack--right'>"
      end_tag     = "</div>"
      str = partial "partials/middleplate/#{md}.md"
      replacements = [
        ["<p>{{section_open}}</p>", opening_tag],
        ["<p>{{section_mid}}</p>", middle_tag],
        ["<p>{{section_end}}</p>", end_tag]
      ]
      replacements.each {|replacement| str.gsub!(replacement[0], replacement[1])}
      str.gsub(/<p>.<\/p>/,"")
      str
  end
  def _g(obj, pre)
    obj = obj || Hash.new
    str = ""

    if obj["d"] and obj["d"] > 0
      str += " g#{pre}_#{obj["d"]} "
    elsif pre != "i"
      str += " g_6 "
    end

    if obj["m"] and obj["m"] > 0
      str += " g#{pre}_#{obj["m"]}-m "
    elsif pre != "i"
      str += " g_10-m "
    end

    if obj["l"] and obj["l"] > 0
      str += " g#{pre}_#{obj["l"]}-l "
    elsif pre != "i"
      str += " g_12-l "
    end
    
    str
  end
  def g(obj)
    str = _g(obj[:width], "")
    str += _g(obj[:indent], "i")
    str
  end
end

# Set constants
Time.zone = "London"

# Set directories
set :css_dir, 'assets/css'
set :js_dir, 'assets/js'
set :images_dir, 'assets/images'
set :hero_dir, '/assets/images/hero/'
set :portfolio_dir, '/assets/images/portfolio/'

# Set base URLs
set :url_root, 'https://robsterlini.co.uk'
set :url_short, 'http://sterlini.co'

# Create pages
data.projects.featured.each_with_index do |c, i|
  if c[:case_study] == 'true'
    proxy "/case-study/#{c[:slug]}.html", "/templates/case-study/case-study.html", :locals => {:project => c, :case_study => c.case_study_vars, :index => i}, :ignore => true
  end
end

# Turn on Pretty URLs
activate :directory_indexes

# Autoprefix this badboy
activate :autoprefixer do |config|
  config.browsers = ['last 2 versions', 'Explorer >= 9']
end


# Turn on sitemap
activate :search_engine_sitemap

# Set up MM for blogging
activate :blog do |blog|
  # set options on blog
  blog.sources = 'articles/{year}-{month}-{day}-{title}.html'
  blog.permalink = 'journal/{title}/index.html'
  blog.tag_template = "tag.html"
  blog.taglink = "journal/category/{tag}/index.html"
  blog.layout = "layout"
  blog.layout = "blog_layout"
end

# disable layout
page ".htaccess.apache", :layout => false
page "redirects/.htaccess.apache", :layout => false
page "feed.xml", :layout => false

#ignore on build
ignore "/pages/*"

# rename file after build
after_build do
  File.rename 'build/.htaccess.apache', 'build/.htaccess'
  File.rename 'build/redirects/.htaccess.apache', 'build/redirects/.htaccess'
end

# Middleplate
with_layout :middleplate_layout do
  page "/middleplate/*"
end
set :mp_github, "https://github.com/robsterlini/middleplate"

# Grailrail
with_layout :grailrail_layout do
  page "/grailrail/*"
end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Minify HTML
  activate :minify_html, remove_http_protocol: false

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
