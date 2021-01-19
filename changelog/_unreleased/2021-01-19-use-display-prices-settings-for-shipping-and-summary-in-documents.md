---
title:              Use display prices setting for shipping and summary in documents
issue:              
author:             Lars Schröder
author_email:       lars.schroeder@kielcoding.de
author_github:      @larsbo
---
# Core
*  Add new block `document_line_item_table_shipping_prices` in document template `Framework/Resources/views/documents/base.html.twig` 
*  Add check for `config.displayPrices` in document template `Framework/Resources/views/documents/base.html.twig` for order shipping positions and summary table
