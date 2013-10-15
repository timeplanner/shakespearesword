module PostsHelper
  def drawAPost(post,searchResult)

    if (searchResult[0].latitude > 0 )
      northSouth = "N"
    else
      northSouth = "S"
    end

    if (searchResult[0].longitude > 0 )
      eastWest = "E"
    else
      eastWest = "W"
    end
    ll = searchResult[0].latitude.to_s() + " " + northSouth + " " + searchResult[0].longitude.to_s()  + " " + eastWest
    # parse video:check if not empty, then add https:
    youtubeVideo=""
    if post.video.empty?
    else
      youtubeVideo = "\<embed width='200' height='200' src='https:#{post.video}?autoplay=1' hidden='false' autoplay='ture'></embed>"
    end
    # parse audio
    audio=""
    if post.audio.empty?
    else
      audio = "\<audio controls='' autoplay='' style='display:none'><source src='#{post.audio}' type='audio/mpeg'></audio>"
    end
    postPoint = {}
    postPoint["#{post.location}"]={"ll"=> ll ,
                                    "country"=> "" ,
                                    "audio"=> audio ,
                                    "name"=> post.user.name ,
                                    "video"=> youtubeVideo ,
                                    "comment"=> post.comment,
                                    "like"=> "" ,
                                    "dislike"=> ""  }


  end

end
