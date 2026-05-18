Jekyll::Hooks.register [:pages, :posts], :post_render do |doc|
  next unless doc.output_ext == '.html'
  next unless doc.output.include?('</body>')

  script_tag = '<script src="/assets/js/glass-theme.js" defer></script>'
  doc.output = doc.output.sub('</body>', "#{script_tag}\n</body>")
end
