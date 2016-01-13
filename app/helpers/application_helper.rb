module ApplicationHelper
  def render_button(name, options = {})
    render partial: "templates/buttons/#{name}", :locals => { options: options }
  end
end
