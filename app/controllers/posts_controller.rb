class PostsController < ApplicationController
  before_filter :signed_in_user , only: [:create, :destroy]
  before_filter :correct_user,   only: :destroy

  def create
    @post = current_user.posts.build(params[:post])
    @searchResult = Geocoder.search(@post.location)
    if @searchResult[0] == nil
       #TODO
       @post.save
    else
      if @post.save
        flash[:success] = "Post created!"
      else
      end

      @post.location = @searchResult[0].address
    end

  end

  def destroy
    @post.destroy
    redirect_to root_url

  end

  def checkLocation
    puts "----checkLocation-----------------------------"
  end



  private

    def correct_user
      @post = current_user.posts.find_by_id(params[:id])
      redirect_to root_url if @post.nil?
    end


end