#include<bits/stdc++.h>
using namespace std;
struct node
{
    char data;
    node*next;
};
node*top=NULL;

void push(char x)
{
    node*temp=new node();
    temp->data=x;
    temp->next=top;
    top=temp;

}


char pop()
{
    char x=top->data;
    top=top->next;
    return x;
}


int priority(char x)
{
    if(x=='('||x==')')
    return 3;
    else
    if(x=='/'||x=='*')
    return 2;
    else if(x=='+'||x=='-')
    return 1;
    else
    return 0;
}


bool isalphanumeric(char x)
{
    
    if((x>='0'&&x<='9')||(x>='a'&&x<='z')||(x>='A'&&x<='Z'))
    return true;
    else
    return false;
}


void inToPos(string s)
{
    cout<<s<<" "<<endl;
    cout<<"infix to postfix expression is :::\n";
        for(int i=0;i<s.length();i++)
        { 
            if(isalphanumeric(s[i])==true)
            {
                cout<<s[i];
            }
            else
            {
                if(top!=NULL && priority(top->data)>=priority(s[i]))
                {
                        cout<<pop();
                }
                else
                push(s[i]);
            }
        }
        while(top)
        {
            cout<<pop();
        }
        
}
int main()
{
    string s;
    cout<<"enter string";
    cin>>s;
    inToPos(s);
    return 0;
}