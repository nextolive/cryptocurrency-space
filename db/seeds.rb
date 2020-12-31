9.times do |i|
    ShitCoin.create(
      name: "ShitCoin #{i + 1}",
      length: i + 2,
      startAt: 1608889009 +(i*1000)
    )
  end