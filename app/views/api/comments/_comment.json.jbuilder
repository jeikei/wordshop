json.extract! comment, :id, :user_id, :text_id, :content, :user, :created_at
json.username comment.user.username
json.text do
	json.partial! 'api/texts/text', text: comment.text
end

