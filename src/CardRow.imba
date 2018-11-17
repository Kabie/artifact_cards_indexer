export tag CardRow < li
  prop language

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
