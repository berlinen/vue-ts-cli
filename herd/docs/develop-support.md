# Inspect routes

- /_debug/custom-routes
- /_debug/custom-routes/simple
- /_debug/handlebars/helpers
- /_debug/options
- /_debug/options/:path+ (path is like: auth.enable | auth.services.someService)
- /_debug/i18n
- /_debug/i18n/t?t=textNeedTranslate
- /_debug/i18n/resources?ns=bundle&lng=language (notice: can only get the language that been loaded)
- /_debug/components/:path+?a=1&b=2 (path is component's path like: buyer/order_manage, all query params will put into render context)
- /:path?_debug (get render context for debug)
