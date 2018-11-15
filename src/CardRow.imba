export tag CardRow < li
  prop language

  def matchText text
    if data:card_name[language]?.search(text) >= 0
      return true

    if data:card_text[language]?.search(text) >= 0
      return true

    if data:illustrator?.search(text) >= 0
      return true

    if data:attack?.toString.search(text) >= 0
      return true

    if data:armor?.toString.search(text) >= 0
      return true

    if data:hit_points?.toString.search(text) >= 0
      return true

    if data:mana_cost?.toString.search(text) >= 0
      return true

    if data:gold_cost?.toString.search(text) >= 0
      return true

  def matchColor colors, noColor
    var hasColor = false
    for color, is_color of colors
      if data[color]
        hasColor = true
        if is_color && data[color] === is_color
          return true
    return if hasColor
      false
    else
      noColor !== hasColor

  def matchType types
    for type, is_type of types
      if data:card_type
        if is_type && data:card_type == type
          return true

    return false

  def matchSubType sub_types
    for sub_type, is_sub_type of sub_types
      if data:sub_type
        if is_sub_type && data:sub_type == sub_type
          return true

    return false

  def matchRarity rarities
    for rarity, is_rarity of rarities
      if data:rarity
        if is_rarity && data:rarity == rarity
          return true
      else
        if rarity == 'Basic' && is_rarity
          return true

    return false

  def matchs query
    if !matchColor(query:color, query:no_color)
      return false

    if !matchType(query:type)
      return false

    if data:sub_type && !matchSubType(query:sub_type)
      return false

    if !matchRarity(query:rarity)
      return false

    if query:text && !matchText(query:text)
      return false

    return true


  def setup
    if data:is_red then dom:classList.add "colorRed"
    if data:is_green then dom:classList.add "colorGreen"
    if data:is_blue then dom:classList.add "colorBlue"
    if data:is_black then dom:classList.add "colorBlack"

    if data:rarity
      dom:classList.add "rarity{data:rarity}"

    if let cardType = data:card_type && data:card_type.replace(' ', '')
      dom:classList.add "type{cardType}"

    if data:sub_type
      dom:classList.add "subType{data:sub_type}"


  def render
    <self>
      if let cardIconUrl = data:mini_image?:default
        <div.cardIcon style="background-image: url({cardIconUrl});">
      else
        <div.cardIcon>

      <div.cardType>

      if let cardCost = data:mana_cost or data:gold_cost
        <div.cardCost> cardCost
      elif let ingameImageUrl = data:ingame_image?:default
        <div.cardIngameImage style="background-image: url({ingameImageUrl});">

      <div.cardName> data:card_name[language]

      <div.cardStat.Attack> data:attack
      <div.cardStat.Armor> data:armor
      <div.cardStat.HitPoints> data:hit_points
