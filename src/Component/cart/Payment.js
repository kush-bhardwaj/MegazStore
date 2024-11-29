
export default function(){
    return (
        <>
            <div class='content'>
<div class="alert alert-success alert-white rounded">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <div class="icon"><i class="fa fa-check"></i></div>
    <strong>Success!</strong> Changes has been saved successfully!
</div>
<div class="alert alert-info alert-white rounded">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <div class="icon"><i class="fa fa-info-circle"></i></div>
    <strong>Info!</strong> You have 3 new messages in your inbox.
</div>
<div class="alert alert-warning alert-white rounded">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <div class="icon"><i class="fa fa-warning"></i></div>
    <strong>Alert!</strong> Don't forget to save your data.
</div>
<div class="alert alert-danger alert-white rounded">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <div class="icon"><i class="fa fa-times-circle"></i></div>
    <strong>Error!</strong> The server is not responding, try again later.
</div>
</div>
        </>
    )
}