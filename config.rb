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

# Moments
set :moments, data.moments["_all"]
moments.each do |m|
  proxy "/moments/#{m}.html", "/moment.html", :locals => { :m => m }, :ignore => true
end

# Projects
set :projects, data.projects["_all"]
projects.each do |p|
  proxy "/projects/#{p}.html", "/project.html", :locals => { :p => p }, :ignore => true
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
