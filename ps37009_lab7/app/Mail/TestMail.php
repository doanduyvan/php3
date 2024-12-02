<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TestMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

     public $subject;
     public $content;

    public function __construct($subject = '', $content = '')
    {
        $this->subject = $subject;
        $this->content = $content;
    }


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $content = $this->content;
        return $this->view('emails.test', compact('content'))
                    ->subject($this->subject);
                
    }
}
